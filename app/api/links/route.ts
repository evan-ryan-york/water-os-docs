import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface LinkData {
  title: string;
  summary: string;
  bulletPoints: string[];
  url: string;
  dateAdded: string;
}

export async function GET() {
  try {
    const linksDir = path.join(process.cwd(), 'wateros', 'links');

    // Check if directory exists
    try {
      await fs.access(linksDir);
    } catch {
      // Directory doesn't exist, return empty array
      return NextResponse.json([]);
    }

    const files = await fs.readdir(linksDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const links: LinkData[] = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(linksDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        return JSON.parse(content) as LinkData;
      })
    );

    return NextResponse.json(links);
  } catch (error) {
    console.error('Error reading links:', error);
    return NextResponse.json({ error: 'Failed to load links' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const linkData: LinkData = await request.json();
    const linksDir = path.join(process.cwd(), 'wateros', 'links');

    // Ensure directory exists
    await fs.mkdir(linksDir, { recursive: true });

    // Generate filename from timestamp
    const filename = `link-${Date.now()}.json`;
    const filePath = path.join(linksDir, filename);

    await fs.writeFile(filePath, JSON.stringify(linkData, null, 2), 'utf8');

    return NextResponse.json({ success: true, filename });
  } catch (error) {
    console.error('Error saving link:', error);
    return NextResponse.json({ error: 'Failed to save link' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();
    const linksDir = path.join(process.cwd(), 'wateros', 'links');

    const files = await fs.readdir(linksDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    // Find and delete the file with matching URL
    for (const file of jsonFiles) {
      const filePath = path.join(linksDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      const linkData = JSON.parse(content) as LinkData;

      if (linkData.url === url) {
        await fs.unlink(filePath);
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: 'Link not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
  }
}
