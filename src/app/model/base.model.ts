export default interface Base {
  _id?: string | null;
  _rev?: string | null;
  _attachments?: any;
  type: string;
  isFavorite: Boolean;
}
