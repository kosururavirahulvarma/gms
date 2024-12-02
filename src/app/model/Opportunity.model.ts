export interface OpportunityEs {
  _index: string;
  _id: string;
  _score: number;
  _source: Opportunity;
}

export interface Opportunity {
  description_cleaned: string;
  description: string;
  opportunity_number: string;
  opportunity_title: string;
  agency_name: string;
  close_date: string;
  grant_url: string;
}

export interface Agency {
  value: Number;
  viewValue: string;
}

export interface OpportunityData {
  Opportunity: string;
  OpportunityTitle: string;
  Agency: string;
  Deadline: string;
  Action: Action;
}
export interface Action {
  view: Boolean;
  favorite: Boolean;
  remainder: Boolean;
}
