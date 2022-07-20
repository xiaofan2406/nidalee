import {createRoot} from 'react-dom/client';
import 'nidalee/reset.css';
import 'nidalee/theme.css';
import 'nidalee/style.css';

import {App} from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
