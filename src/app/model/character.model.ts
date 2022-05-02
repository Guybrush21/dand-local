import Base from './base.model';

export default interface Character extends Base {
    name: string;
    type: string;
    sex: 'male' | 'female';
    class: string;
    race: string;
    description?: string;
    imageUrl?: string;
}
