export namespace Login {
	export interface ReqLoginform {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
}
