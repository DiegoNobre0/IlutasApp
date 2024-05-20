export type Competidor = {
  id: number;
  nome: string;
  idade: number;
  urlImagem: string;
  category: string;
  modality: string;
  team: {
    name: string;
    urlImagem: string;
    teacher: string;
  }
  ranking: number;
};

export type EventInfoDate = {
  name: string;
  description: string;
  icon: string;
  subtitle: string;
}

export type Values = {
  name: string;
  description: string;
  subtitle: string;
}

export type EventInformation = {
  presentation: {
    value: string;
    order: number;
    content: string;
  },
  categories: {
    value: string;
    order: number;
    content: string;
  },
  keys: {
    value: string;
    order: number;
    content: string;
  },
  results: {
    value: string;
    order: number;
    content: string;
  },
  cronogram: {
    value: string;
    order: number;
    content: string;
  },
  warnings: {
    value: string;
    order: number;
    content: string;
  },
  galery: {
    value: string;
    order: number;
    content: string;
  },
}


export type Organization = {
  name: string;
  responsible: string;
  email: string;
  phone: string;
}

export type Results = {
  firstPlace?: Competidor;
  secondPlace?: Competidor;
  thirdPlace?: Competidor;
}


export type Evento = {
  id: number;
  name: string;
  description: string;
  urlImagem: string;
  date: string;
  expireDate: string;
  organization: Organization;
  values: {
    date: string;
    signDate: string;
    payment: string;
    generalCheck: string;
    oficialCheck: string;
    consultCheck: string;
    keys: string;
    calendar: string;
  }
  eventInformation: EventInformation;
  categories: string[];
  modalities: string[];
  competitors: Competidor[];
  results: Array<{
    category: string;
    modality: string;
    description: string;
    results: Results;
  }>
  liveUrl: string;
};