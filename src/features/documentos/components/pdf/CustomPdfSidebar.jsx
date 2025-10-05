import { FileText, BookMarked, Search } from 'lucide-react';

export const renderSidebarTabs = (defaultTabs) => {
  return defaultTabs.map((tab) => {
    if (tab.title === 'Thumbnail') {
      return {
        ...tab,
        title: 'Páginas',
        icon: <FileText size={16} className="text-muted-foreground" />,
        content: <div className="w-full p-2 text-sm">{tab.content}</div>,
      };
    }

    if (tab.title === 'Bookmark') {
      return {
        ...tab,
        title: 'Marcadores',
        icon: <BookMarked size={16} className="text-muted-foreground" />,
        content: <div className="w-full p-2 text-sm">{tab.content}</div>,
      };
    }

    if (tab.title === 'Search') {
      return {
        ...tab,
        title: 'Procurar',
        icon: <Search size={16} className="text-muted-foreground" />,
        content: <div className="p-2 text-sm">{tab.content}</div>,
      };
    }

    return tab;
  });
};
