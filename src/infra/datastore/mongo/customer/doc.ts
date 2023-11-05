export interface CustomerDocument {
    _id: string;
    cpf: string;
    name: string;
    lastModifiedAt: Date;
    lastModifiedBy: string;
  }
  

  type CustomerDocuments = CustomerDocument[];
