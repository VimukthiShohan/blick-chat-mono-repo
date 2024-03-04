import { Metadata } from 'next';

import MessengerLayout from './MessengerLayout';

export const metadata: Metadata = { title: 'Messenger' };

const MessengerPage = () => <MessengerLayout />;

export default MessengerPage;
