// environment.ts
export class Environment {
    public apiSettings = {
        httpMaxRetries: 3,
        httpTimeout: 1000,
        hubMaxRetries : 3,
        hubTimeout : 3000,
    }
    production= false;
    environmentName =  "development";
    private useHttps = false;
    private use_gh_pages=false;
    private gh_pages_imagesURLs={
        deploy:"https://seadtn.github.io/HichemAbidPlat/assets/images/slider/",
        local:"/assets/images/slider/"
    }
     private apiUrls = {
        http:"http://localhost:8082/api/v1/hrManagement",
        https:"https://localhost:8082/api/v1/hrManagement",
        // http: 'https://0q4lq75f-8082.uks1.devtunnels.ms/api/v1/hrManagement',
        // https: 'https://0q4lq75f-8082.uks1.devtunnels.ms/api/v1/hrManagement',
        hubUrl : 'http://localhost:5269/AppHub',
        hubUrlHttps : 'https://localhost:5269/AppHub',
    }
    public getImagesURLs(){
        return this.use_gh_pages ? this.gh_pages_imagesURLs.deploy : this.gh_pages_imagesURLs.local;
    }
    public getApiUrl() {
        return this.useHttps ? this.apiUrls.https : this.apiUrls.http;
    }
    public getHubUrl() {
        return this.useHttps ? this.apiUrls.hubUrlHttps : this.apiUrls.hubUrl;
    }
}

export const environment  = new Environment();
// ng serve              # Uses development configuration
// ng serve -o           # Opens in browser automatically