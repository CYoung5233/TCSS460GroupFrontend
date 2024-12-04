// project import
import samplePage from './sample-page';
import other from './other';
import pages from './messages';
import searchBooks from './books/searchBooks';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [samplePage, pages, other, searchBooks], 
};

export default menuItems;
