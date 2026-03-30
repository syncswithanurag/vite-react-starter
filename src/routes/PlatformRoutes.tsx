import * as urls from '../routes/config';
import Overview from '../pages/authorized/overview';
import MakeYours from '../pages/authorized/makeYours';
import { Navigate, Route, Routes } from 'react-router-dom';
import Configurations from '../pages/authorized/configurations';
import FolderStructure from '../pages/authorized/folderStructure';

export default function PlatformRouter() {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path={urls.platform.configurations} element={<Configurations />} />
      <Route path={urls.platform.folderStructure} element={<FolderStructure />} />
      <Route path={urls.platform.makeYours} element={<MakeYours />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
}
