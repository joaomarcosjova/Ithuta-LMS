import messageEn from './en.json';
import messagePt from './pt.json';

type Indexable<T = any> = {
  [key: string]: T;
};

export const tr = (locale :string, key :string) :string => {
  switch (locale) {
    case 'pt':
      return (messagePt as Indexable)[key] || key;
    default:
      return (messageEn as Indexable)[key] || key ;
  }
}