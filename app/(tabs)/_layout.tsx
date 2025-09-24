import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Report Issue',
          
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'View Reports',
          
        }}
      />
    </Tabs>
  );
}