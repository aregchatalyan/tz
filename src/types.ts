export interface CountryInfo {
  name: {
    common: string;
    official: string;
  }
  capital: string[];
  flag: string;
  flags: {
    svg: string;
    png: string;
  }
}
