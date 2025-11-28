"use client";

import React from 'react';
import AvatarUpload, { useAvatarUpload } from './AvatarUpload';

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  organizationId: string | null;
  jobTitle: string;
  description: string;
  tags: string[];
  dateAdded: string;
  lastContacted: string;
};

type Organization = {
  id: string;
  name: string;
  avatar: string;
  address: string;
  email: string;
  phone: string;
  primaryContactId: string | null;
  businessType: string;
  tags: string[];
  dateAdded: string;
};

type Note = {
  id: string;
  entityId: string;
  entityType: 'person' | 'organization';
  timestamp: string;
  content: string;
};

type SelectedEntity = {
  type: 'person' | 'organization';
  id: string;
};

export default function CRM() {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [organizations, setOrganizations] = React.useState<Organization[]>([]);
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState<'all' | 'people' | 'organizations'>('all');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [showNewPersonForm, setShowNewPersonForm] = React.useState(false);
  const [showNewOrgForm, setShowNewOrgForm] = React.useState(false);
  const [editingPerson, setEditingPerson] = React.useState<Person | null>(null);
  const [editingOrganization, setEditingOrganization] = React.useState<Organization | null>(null);
  const [selectedEntity, setSelectedEntity] = React.useState<SelectedEntity | null>(null);
  const [copied, setCopied] = React.useState(false);

  const loadData = async () => {
    try {
      const [peopleRes, orgsRes, notesRes] = await Promise.all([
        fetch('/api/crm?type=people'),
        fetch('/api/crm?type=organizations'),
        fetch('/api/crm?type=notes'),
      ]);

      const peopleData = await peopleRes.json();
      const orgsData = await orgsRes.json();
      const notesData = await notesRes.json();

      setPeople(peopleData.data);
      setOrganizations(orgsData.data);
      setNotes(notesData.data);
    } catch (error) {
      console.error('Failed to load CRM data:', error);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleSavePerson = async (person: Person, pendingAvatarFile?: File | null) => {
    try {
      // Save person to database
      const response = await fetch('/api/crm?type=people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: person }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error('Failed to save person:', result.error);
        return;
      }

      const savedPerson = result.data;

      // If there's a pending avatar file, upload it now
      if (pendingAvatarFile && savedPerson?.id) {
        const formData = new FormData();
        formData.append('file', pendingAvatarFile);
        formData.append('entityType', 'person');
        formData.append('entityId', savedPerson.id);

        await fetch('/api/avatar', {
          method: 'POST',
          body: formData,
        });
      }

      // Refresh data from server
      await loadData();
      setEditingPerson(null);
      setShowNewPersonForm(false);
    } catch (error) {
      console.error('Error saving person:', error);
    }
  };

  const handleSaveOrganization = async (org: Organization, pendingAvatarFile?: File | null) => {
    try {
      // Save organization to database
      const response = await fetch('/api/crm?type=organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: org }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error('Failed to save organization:', result.error);
        return;
      }

      const savedOrg = result.data;

      // If there's a pending avatar file, upload it now
      if (pendingAvatarFile && savedOrg?.id) {
        const formData = new FormData();
        formData.append('file', pendingAvatarFile);
        formData.append('entityType', 'organization');
        formData.append('entityId', savedOrg.id);

        await fetch('/api/avatar', {
          method: 'POST',
          body: formData,
        });
      }

      // Refresh data from server
      await loadData();
      setEditingOrganization(null);
      setShowNewOrgForm(false);
    } catch (error) {
      console.error('Error saving organization:', error);
    }
  };

  const handleAddNote = async (entityId: string, entityType: 'person' | 'organization', content: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      entityId,
      entityType,
      timestamp: new Date().toISOString(),
      content
    };
    const updatedNotes = [...notes, newNote];
    await fetch('/api/crm?type=notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: updatedNotes }),
    });
    setNotes(updatedNotes);
  };

  const handleEditPerson = (person: Person) => {
    setEditingPerson(person);
    setShowNewPersonForm(true);
  };

  const handleEditOrganization = (org: Organization) => {
    setEditingOrganization(org);
    setShowNewOrgForm(true);
  };

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    people.forEach(p => p.tags.forEach(t => tags.add(t)));
    organizations.forEach(o => o.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [people, organizations]);

  const filteredPeople = React.useMemo(() => {
    return people.filter(person => {
      const matchesSearch =
        person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => person.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [people, searchQuery, selectedTags]);

  const filteredOrganizations = React.useMemo(() => {
    return organizations.filter(org => {
      const matchesSearch =
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.businessType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => org.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [organizations, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleCardClick = (type: 'person' | 'organization', id: string) => {
    setSelectedEntity({ type, id });
  };

  const formatCRMForCopy = () => {
    let text = "# CRM Data Export\n\n";

    // People
    text += "## People\n\n";
    people.forEach(person => {
      const org = organizations.find(o => o.id === person.organizationId);
      text += `### ${person.firstName} ${person.lastName}\n`;
      text += `- **Job Title:** ${person.jobTitle}\n`;
      text += `- **Email:** ${person.email}\n`;
      text += `- **Phone:** ${person.phone}\n`;
      if (org) text += `- **Organization:** ${org.name}\n`;
      if (person.description) text += `- **Description:** ${person.description}\n`;
      if (person.tags.length > 0) text += `- **Tags:** ${person.tags.join(', ')}\n`;

      // Add notes for this person
      const personNotes = notes.filter(n => n.entityId === person.id && n.entityType === 'person');
      if (personNotes.length > 0) {
        text += `- **Notes:**\n`;
        personNotes.forEach(note => {
          text += `  - ${new Date(note.timestamp).toLocaleDateString()}: ${note.content}\n`;
        });
      }
      text += '\n';
    });

    // Organizations
    text += "## Organizations\n\n";
    organizations.forEach(org => {
      const primaryContact = people.find(p => p.id === org.primaryContactId);
      text += `### ${org.name}\n`;
      text += `- **Business Type:** ${org.businessType}\n`;
      text += `- **Address:** ${org.address}\n`;
      text += `- **Email:** ${org.email}\n`;
      text += `- **Phone:** ${org.phone}\n`;
      if (primaryContact) text += `- **Primary Contact:** ${primaryContact.firstName} ${primaryContact.lastName}\n`;
      if (org.tags.length > 0) text += `- **Tags:** ${org.tags.join(', ')}\n`;

      // Add notes for this organization
      const orgNotes = notes.filter(n => n.entityId === org.id && n.entityType === 'organization');
      if (orgNotes.length > 0) {
        text += `- **Notes:**\n`;
        orgNotes.forEach(note => {
          text += `  - ${new Date(note.timestamp).toLocaleDateString()}: ${note.content}\n`;
        });
      }
      text += '\n';
    });

    return text;
  };

  const handleCopy = async () => {
    try {
      const content = formatCRMForCopy();
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">CRM Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Version: 1.0 | Last Updated: 2025-11-25</p>
        </div>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="flex gap-4">
        <div className={`flex flex-col gap-4 transition-all ${selectedEntity ? 'w-2/3' : 'w-full'}`}>
          <div className="flex gap-3">
            <button
              onClick={() => setShowNewPersonForm(true)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              + New Person
            </button>
            <button
              onClick={() => setShowNewOrgForm(true)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              + New Organization
            </button>
          </div>

        <div className="bg-white border rounded p-4">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'people' | 'organizations')}
              className="px-3 py-2 border rounded"
            >
              <option value="all">All</option>
              <option value="people">People</option>
              <option value="organizations">Organizations</option>
            </select>
          </div>

          {allTags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Tags:</span>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedTags.includes(tag)
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(filterType === 'all' || filterType === 'people') && filteredPeople.map(person => (
            <PersonCard
              key={person.id}
              person={person}
              organizations={organizations}
              onClick={() => handleCardClick('person', person.id)}
              isSelected={selectedEntity?.type === 'person' && selectedEntity.id === person.id}
            />
          ))}
          {(filterType === 'all' || filterType === 'organizations') && filteredOrganizations.map(org => (
            <OrganizationCard
              key={org.id}
              organization={org}
              people={people}
              onClick={() => handleCardClick('organization', org.id)}
              isSelected={selectedEntity?.type === 'organization' && selectedEntity.id === org.id}
            />
          ))}
        </div>
      </div>

      {selectedEntity && (
        <DetailPanel
          selectedEntity={selectedEntity}
          people={people}
          organizations={organizations}
          notes={notes}
          onClose={() => setSelectedEntity(null)}
          onAddNote={handleAddNote}
          onEdit={(type, entity) => {
            if (type === 'person') {
              handleEditPerson(entity as Person);
            } else {
              handleEditOrganization(entity as Organization);
            }
          }}
        />
      )}

      {showNewPersonForm && (
        <PersonForm
          onSave={handleSavePerson}
          onCancel={() => {
            setShowNewPersonForm(false);
            setEditingPerson(null);
          }}
          organizations={organizations}
          initialData={editingPerson}
          onDataRefresh={loadData}
        />
      )}

      {showNewOrgForm && (
        <OrganizationForm
          onSave={handleSaveOrganization}
          onCancel={() => {
            setShowNewOrgForm(false);
            setEditingOrganization(null);
          }}
          people={people}
          initialData={editingOrganization}
          onDataRefresh={loadData}
        />
      )}
      </div>
    </div>
  );
}

function PersonCard({
  person,
  organizations,
  onClick,
  isSelected
}: {
  person: Person;
  organizations: Organization[];
  onClick: () => void;
  isSelected: boolean;
}) {
  const org = organizations.find(o => o.id === person.organizationId);

  return (
    <div
      onClick={onClick}
      className={`bg-white border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer ${
        isSelected ? 'ring-2 ring-black' : ''
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        {person.avatar ? (
          <img
            src={person.avatar}
            alt={`${person.firstName} ${person.lastName}`}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold">
            {person.firstName[0]}{person.lastName[0]}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{person.firstName} {person.lastName}</h3>
          <p className="text-sm text-gray-600">{person.jobTitle}</p>
        </div>
      </div>

      {org && (
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Org:</span> {org.name}
        </p>
      )}

      <div className="space-y-1 mb-3 text-sm">
        <p className="text-gray-700">{person.email}</p>
        <p className="text-gray-700">{person.phone}</p>
      </div>

      {person.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{person.description}</p>
      )}

      {person.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-3">
          {person.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500 border-t pt-2">
        <p>Added: {new Date(person.dateAdded).toLocaleDateString()}</p>
        <p>Last Contact: {new Date(person.lastContacted).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

function OrganizationCard({
  organization,
  people,
  onClick,
  isSelected
}: {
  organization: Organization;
  people: Person[];
  onClick: () => void;
  isSelected: boolean;
}) {
  const primaryContact = people.find(p => p.id === organization.primaryContactId);

  return (
    <div
      onClick={onClick}
      className={`bg-white border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer ${
        isSelected ? 'ring-2 ring-black' : ''
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        {organization.avatar ? (
          <img
            src={organization.avatar}
            alt={organization.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl font-semibold">
            {organization.name[0]}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{organization.name}</h3>
          <p className="text-sm text-gray-600">{organization.businessType}</p>
        </div>
      </div>

      {primaryContact && (
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Contact:</span> {primaryContact.firstName} {primaryContact.lastName}
        </p>
      )}

      <div className="space-y-1 mb-3 text-sm">
        <p className="text-gray-700">{organization.address}</p>
        <p className="text-gray-700">{organization.email}</p>
        <p className="text-gray-700">{organization.phone}</p>
      </div>

      {organization.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-3">
          {organization.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-blue-100 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500 border-t pt-2">
        <p>Added: {new Date(organization.dateAdded).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

function DetailPanel({
  selectedEntity,
  people,
  organizations,
  notes,
  onClose,
  onAddNote,
  onEdit
}: {
  selectedEntity: SelectedEntity;
  people: Person[];
  organizations: Organization[];
  notes: Note[];
  onClose: () => void;
  onAddNote: (entityId: string, entityType: 'person' | 'organization', content: string) => void;
  onEdit: (type: 'person' | 'organization', entity: Person | Organization) => void;
}) {
  const [newNoteContent, setNewNoteContent] = React.useState('');

  const entity = selectedEntity.type === 'person'
    ? people.find(p => p.id === selectedEntity.id)
    : organizations.find(o => o.id === selectedEntity.id);

  const entityNotes = notes
    .filter(n => n.entityId === selectedEntity.id && n.entityType === selectedEntity.type)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (!entity) return null;

  const handleSubmitNote = () => {
    if (newNoteContent.trim()) {
      onAddNote(selectedEntity.id, selectedEntity.type, newNoteContent.trim());
      setNewNoteContent('');
    }
  };

  return (
    <div className="w-1/3 bg-white border rounded-lg p-4 flex flex-col max-h-screen overflow-hidden">
      <div className="flex justify-between items-start mb-4 pb-4 border-b">
        <h2 className="text-xl font-bold">Details</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(selectedEntity.type, entity)}
            className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800"
          >
            Edit
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {selectedEntity.type === 'person' ? (
          <PersonDetails person={entity as Person} organizations={organizations} />
        ) : (
          <OrganizationDetails organization={entity as Organization} people={people} />
        )}

        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-3">Running Notes</h3>

          <div className="mb-4">
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Add a note..."
              className="w-full px-3 py-2 border rounded resize-none"
              rows={3}
            />
            <button
              onClick={handleSubmitNote}
              className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 w-full"
            >
              Add Note
            </button>
          </div>

          <div className="space-y-3">
            {entityNotes.map(note => (
              <div key={note.id} className="bg-gray-50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">
                  {new Date(note.timestamp).toLocaleString()}
                </p>
                <p className="text-sm">{note.content}</p>
              </div>
            ))}
            {entityNotes.length === 0 && (
              <p className="text-sm text-gray-500 italic">No notes yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonDetails({ person, organizations }: { person: Person; organizations: Organization[] }) {
  const org = organizations.find(o => o.id === person.organizationId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {person.avatar ? (
          <img
            src={person.avatar}
            alt={`${person.firstName} ${person.lastName}`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-semibold">
            {person.firstName[0]}{person.lastName[0]}
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold">{person.firstName} {person.lastName}</h3>
          <p className="text-gray-600">{person.jobTitle}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-500 uppercase">Email</label>
          <p className="text-sm">{person.email}</p>
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase">Phone</label>
          <p className="text-sm">{person.phone}</p>
        </div>
        {org && (
          <div>
            <label className="text-xs text-gray-500 uppercase">Organization</label>
            <p className="text-sm">{org.name}</p>
          </div>
        )}
        {person.description && (
          <div>
            <label className="text-xs text-gray-500 uppercase">Description</label>
            <p className="text-sm">{person.description}</p>
          </div>
        )}
      </div>

      {person.tags.length > 0 && (
        <div>
          <label className="text-xs text-gray-500 uppercase mb-2 block">Tags</label>
          <div className="flex gap-2 flex-wrap">
            {person.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1 text-xs text-gray-500 border-t pt-4">
        <p>Added: {new Date(person.dateAdded).toLocaleDateString()}</p>
        <p>Last Contact: {new Date(person.lastContacted).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

function OrganizationDetails({ organization, people }: { organization: Organization; people: Person[] }) {
  const primaryContact = people.find(p => p.id === organization.primaryContactId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {organization.avatar ? (
          <img
            src={organization.avatar}
            alt={organization.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl font-semibold">
            {organization.name[0]}
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold">{organization.name}</h3>
          <p className="text-gray-600">{organization.businessType}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-500 uppercase">Address</label>
          <p className="text-sm">{organization.address}</p>
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase">Email</label>
          <p className="text-sm">{organization.email}</p>
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase">Phone</label>
          <p className="text-sm">{organization.phone}</p>
        </div>
        {primaryContact && (
          <div>
            <label className="text-xs text-gray-500 uppercase">Primary Contact</label>
            <p className="text-sm">{primaryContact.firstName} {primaryContact.lastName}</p>
          </div>
        )}
      </div>

      {organization.tags.length > 0 && (
        <div>
          <label className="text-xs text-gray-500 uppercase mb-2 block">Tags</label>
          <div className="flex gap-2 flex-wrap">
            {organization.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-blue-100 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1 text-xs text-gray-500 border-t pt-4">
        <p>Added: {new Date(organization.dateAdded).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

function PersonForm({
  onSave,
  onCancel,
  organizations,
  initialData,
  onDataRefresh
}: {
  onSave: (person: Person, pendingAvatarFile?: File | null) => void;
  onCancel: () => void;
  organizations: Organization[];
  initialData?: Person | null;
  onDataRefresh?: () => void;
}) {
  const [formData, setFormData] = React.useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    avatar: initialData?.avatar || '',
    organizationId: initialData?.organizationId || '',
    jobTitle: initialData?.jobTitle || '',
    description: initialData?.description || '',
    tags: initialData?.tags.join(', ') || '',
  });

  const avatarUpload = useAvatarUpload();

  const handleAvatarChange = (url: string | null) => {
    setFormData({ ...formData, avatar: url || '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const person: Person = {
      id: initialData?.id || crypto.randomUUID(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      avatar: avatarUpload.previewUrl || formData.avatar,
      organizationId: formData.organizationId || null,
      jobTitle: formData.jobTitle,
      description: formData.description,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      dateAdded: initialData?.dateAdded || new Date().toISOString(),
      lastContacted: initialData?.lastContacted || new Date().toISOString(),
    };
    onSave(person, avatarUpload.pendingFile);
  };

  const getInitials = () => {
    const first = formData.firstName?.[0] || '';
    const last = formData.lastName?.[0] || '';
    return (first + last).toUpperCase() || '?';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Person' : 'New Person'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex justify-center pb-4 border-b">
            <AvatarUpload
              entityType="person"
              entityId={initialData?.id || null}
              currentAvatar={formData.avatar || null}
              onAvatarChange={(url) => {
                handleAvatarChange(url);
                if (url && initialData?.id) {
                  onDataRefresh?.();
                }
              }}
              initials={getInitials()}
              shape="circle"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Organization</label>
            <select
              value={formData.organizationId}
              onChange={(e) => setFormData({ ...formData, organizationId: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">None</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g. investor, technical"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              {initialData ? 'Update Person' : 'Save Person'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function OrganizationForm({
  onSave,
  onCancel,
  people,
  initialData,
  onDataRefresh
}: {
  onSave: (org: Organization, pendingAvatarFile?: File | null) => void;
  onCancel: () => void;
  people: Person[];
  initialData?: Organization | null;
  onDataRefresh?: () => void;
}) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    avatar: initialData?.avatar || '',
    address: initialData?.address || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    primaryContactId: initialData?.primaryContactId || '',
    businessType: initialData?.businessType || '',
    tags: initialData?.tags.join(', ') || '',
  });

  const avatarUpload = useAvatarUpload();

  const handleAvatarChange = (url: string | null) => {
    setFormData({ ...formData, avatar: url || '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const org: Organization = {
      id: initialData?.id || crypto.randomUUID(),
      name: formData.name,
      avatar: avatarUpload.previewUrl || formData.avatar,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      primaryContactId: formData.primaryContactId || null,
      businessType: formData.businessType,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      dateAdded: initialData?.dateAdded || new Date().toISOString(),
    };
    onSave(org, avatarUpload.pendingFile);
  };

  const getInitials = () => {
    return formData.name?.[0]?.toUpperCase() || '?';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Organization' : 'New Organization'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex justify-center pb-4 border-b">
            <AvatarUpload
              entityType="organization"
              entityId={initialData?.id || null}
              currentAvatar={formData.avatar || null}
              onAvatarChange={(url) => {
                handleAvatarChange(url);
                if (url && initialData?.id) {
                  onDataRefresh?.();
                }
              }}
              initials={getInitials()}
              shape="rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Organization Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Business Type</label>
            <input
              type="text"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g. Technology Provider, Non-Profit, Venture Capital"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Primary Contact</label>
            <select
              value={formData.primaryContactId}
              onChange={(e) => setFormData({ ...formData, primaryContactId: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">None</option>
              {people.map(person => (
                <option key={person.id} value={person.id}>
                  {person.firstName} {person.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g. customer, partner"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              {initialData ? 'Update Organization' : 'Save Organization'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
