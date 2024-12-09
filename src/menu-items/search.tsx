// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import ChromeOutlined from '@ant-design/icons/ChromeOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { ChromeOutlined };

// ==============================|| SEARCH PAGE ||============================== //

const search: NavItemType = {
  id: 'search',
  title: <FormattedMessage id="search" />,
  type: 'group',
  url: '/search',
  icon: icons.ChromeOutlined
};

export default search;
