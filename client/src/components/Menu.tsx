import { DropdownMenu } from '@radix-ui/themes';
import { memo } from 'react';

interface MenuItem {
  label: string;
  onClick: () => void;
}

const Menu = memo(
  function Menu({
    align = 'end',
    items,
    Trigger,
  }: {
    align?: 'start' | 'center' | 'end';
    items: MenuItem[];
    Trigger: React.ReactNode;
  }) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>{Trigger}</DropdownMenu.Trigger>
        <DropdownMenu.Content align={align}>
          {items.map((item) => (
            <DropdownMenu.Item key={item.label} onClick={item.onClick}>
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  },
  () => true,
);
export default Menu;
