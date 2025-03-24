import { Box, Tabs, Theme } from '@radix-ui/themes';
import './index.css';
import Users from './pages/Users';
import Roles from './pages/Roles';

function App() {
  return (
    <Theme accentColor="purple">
      <Box
        px="6"
        py="4"
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
        }}
      >
        <Tabs.Root
          defaultValue="users"
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <Tabs.List>
            <Tabs.Trigger value="users">Users</Tabs.Trigger>
            <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="users">
            <Users />
          </Tabs.Content>
          <Tabs.Content value="roles">
            <Roles />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Theme>
  );
}

export default App;
