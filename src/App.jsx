import DynamicSVG from './dynamicSvg';
import OkIcon from './dynamicSvg/assets/icons8-ok.svg';
import LockIcon from './dynamicSvg/assets/icons8-lock.svg';
import SettingIcon from './dynamicSvg/assets/icons8-setting.svg';

function App() {

  const iconsArr = [
    {
      name: 'OkIcon',
      icon: OkIcon,
    },
    {
      name: 'LockIcon',
      icon: LockIcon,
    },
    {
      name: 'SettingIcon',
      icon: SettingIcon,
    }
  ];

  const nodesArr = [
    {
      id: '1',
      icon: 'OkIcon',
      isComplete: true,
      iconAfterNode: 'SettingIcon',
    },
    {
      id: '2',
      icon: null,
      isCurrent: true,
      isComplete: false,
    },
    {
      id: '3',
      icon: 'LockIcon',
      isComplete: false,
      isLocked: true,
    },
    {
      id: '4',
      icon: 'LockIcon',
      isComplete: false,
      isLocked: true,
    },
  ];

  return (
    <DynamicSVG 
      nodesArr={nodesArr} 
      iconsArr={iconsArr}
    />
  )
}

export default App
