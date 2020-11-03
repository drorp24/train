export type Graph = {
    name: string;
    id: string;
    meta: {
      tables: number;
      lastUpdated: number;
      description: string;
    };
  };
  
  type GraphResponseItem = {
    _id: string;
    comment: string;
    tables_count: number;
    last_ingested?: number;
  };
  
  type FetchGraphPayload = GraphResponseItem[];
  