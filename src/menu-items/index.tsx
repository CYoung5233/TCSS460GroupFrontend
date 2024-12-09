// project import
import samplePage from './sample-page';
import other from './other';
import pages from './messages';
import searchBooks from './books/searchBooks';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [samplePage, pages, other, searchBooks]
};
//This is what's causing the nav bar warning - there is no searchBooks under views/books
//TODO - either move searchBooks to views/books/ or get rid of the searchBooks item

export default menuItems;
