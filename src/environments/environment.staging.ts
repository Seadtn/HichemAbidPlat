// environment.staging.ts
export class Environment {
  public apiSettings = {
      httpMaxRetries: 3,
      httpTimeout: 1000,
      hubMaxRetries : 3,
      hubTimeout : 3000,
  }
  production= false;
  environmentName =  "staging";
  private useHttps = false;

  private apiUrls = {
    http: 'https://0q4lq75f-8080.uks1.devtunnels.ms/api/v1/hrManagement',
    https: 'https://0q4lq75f-8080.uks1.devtunnels.ms/api/v1/hrManagement',
    hubUrl : 'http://x:5000/AppHub',
    hubUrlHttps : 'https://x:5001/AppHub',
  }

  public getApiUrl() {
      return this.useHttps ? this.apiUrls.https : this.apiUrls.http;
  }
  public getHubUrl() {
      return this.useHttps ? this.apiUrls.hubUrlHttps : this.apiUrls.hubUrl;
  }
}

export const environment  = new Environment();
// usage for serve or build : 
// ng serve --configuration staging
// ng build --configuration staging