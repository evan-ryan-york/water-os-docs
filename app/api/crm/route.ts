import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type'); // 'people', 'organizations', or 'notes'

  if (!type || !['people', 'organizations', 'notes'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'wateros', 'crm', `${type}.json`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error reading CRM data:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  if (!type || !['people', 'organizations', 'notes'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const filePath = path.join(process.cwd(), 'wateros', 'crm', `${type}.json`);
    await fs.writeFile(filePath, JSON.stringify(body.data, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing CRM data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
