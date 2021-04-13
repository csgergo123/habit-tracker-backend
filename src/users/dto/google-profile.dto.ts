export class GoogleProfileDto {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: [{ value: string; verified: boolean }];
  photos: [{ value: string }];
  provider: string;
  _raw: string;
  _json: any;
}
