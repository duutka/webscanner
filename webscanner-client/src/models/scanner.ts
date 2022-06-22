// interface IKeyWord {
//   word: string;
//   count: number;
// }

// interface ISEOWarning {
//   message: string;
// }

// interface IPageAnalyze {
//   url: string;
//   title: string;
//   description: string;
//   seoWarnings: ISEOWarning[];
//   headings: string;
// }

// interface ISEOAnalyze {
//   keyWords: IKeyWord[];
//   pages: IPageAnalyze[];
// }
export interface IUrlStatus {
  title: boolean;
  description: boolean;
  keywords: boolean;
  status: string;
  url: string;
}

interface ISEO {
  sitemap: boolean;
  robots: boolean;
  urls: IUrlStatus[];
  // seoanalyze: ISEOAnalyze;
}

export interface IPort {
  protocol: string;
  port: number;
  service: string;
  state: string;
  cve: string;
}

export interface IHost {
  host: string;
  status: string;
  ports: IPort[];
}

export interface IBruteForce {
  ssh: string;
  ftp: string;
  mysql: string;
  mysqlempty: string;
}

export interface IInjection {
  url: string;
  xss: boolean;
  sql: boolean;
}

export interface IHttpenum {
  product: string;
  ostype: string;
  version: string;
  extrainfo: string;
  hostname: string;
  httpenum: string;
}

export interface IAuth {
  authFinder: string;
  authBrute: string;
}

export interface IScanner {
  url: string;
  injections: IInjection[];
  seo: ISEO | null;
  hosts: IHost[];
  bruteforce: IBruteForce | null;
  auth: IAuth | null;
  httpenum: IHttpenum[];
}
