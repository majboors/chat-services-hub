
const BASE_URL = "https://whatsappmarket.applytocollege.pk";

export interface NumberDetails {
  list_name: string;
  owner: string;
  number: number;
  name: string;
  interests: string;
  age: string;
  location: string;
  gender: string;
  language: string;
  occupation: string;
  preferred_contact_time: string;
  tags: string;
  additional_details: string;
}

export interface CampaignDetails {
  content: string;
  media_files: string[];
  name: string;
  number_list: string;
  owner: string;
}

export const apiService = {
  // Auth
  registerUser: async (username: string, password: string, role: string) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }),
    });
    return await response.json();
  },

  // Number Lists
  createNumberList: async (list_name: string, username: string) => {
    const response = await fetch(`${BASE_URL}/numbers/create-list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ list_name, username }),
    });
    return await response.json();
  },

  addNumberToList: async (data: {
    list_name: string;
    username: string;
    number: string;
    name: string;
    interests: string;
    age: string;
    location: string;
    gender: string;
    language: string;
    occupation: string;
    preferred_contact_time: string;
    tags: string;
  }) => {
    const response = await fetch(`${BASE_URL}/numbers/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  // Campaigns
  createCampaign: async (formData: FormData) => {
    // Remove headers to let browser set correct multipart/form-data boundary
    const response = await fetch(`${BASE_URL}/campaign/create`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    // Return the campaign name as the ID since that's what the server expects
    return {
      campaign_id: formData.get('name') as string,
      ...data
    };
  },

  executeCampaign: async (campaignId: string, batch_size: number, offset: number) => {
    const response = await fetch(`${BASE_URL}/campaign/execute/${campaignId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ batch_size, offset }),
    });
    return await response.json();
  },

  listPendingCampaigns: async () => {
    const response = await fetch(`${BASE_URL}/campaign/list-pending`);
    return await response.json();
  },

  getNextNumber: async (campaignId: string) => {
    const response = await fetch(`${BASE_URL}/campaign/${campaignId}/next-number`);
    return await response.json();
  },

  processNumber: async (data: {
    campaign_id: string;
    number: string;
    status: string;
    notes: string;
    feedback: Record<string, any>;
  }) => {
    const response = await fetch(`${BASE_URL}/campaign/process-number`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  getCampaignStatus: async (campaignId: string) => {
    const response = await fetch(`${BASE_URL}/campaign/status/${campaignId}`);
    return await response.json();
  },

  listAllCampaigns: async () => {
    const response = await fetch(`${BASE_URL}/campaign/list-all`);
    return await response.json();
  },

  getNextNumberForReview: async (campaignId: string) => {
    const response = await fetch(`${BASE_URL}/campaign/${campaignId}/next-number`);
    return await response.json();
  },

  updateReview: async (data: {
    campaign_id: string;
    number: string;
    approved: boolean;
    notes: string;
  }) => {
    const response = await fetch(`${BASE_URL}/campaign/update-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
};
