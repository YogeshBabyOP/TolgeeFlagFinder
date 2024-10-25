import { useTolgee } from '@tolgee/react';

const LangSelector = () => {
  const tolgee = useTolgee(['language']);

  return (
    <select
      onChange={(e) => tolgee.changeLanguage(e.target.value)}
          value={tolgee.getLanguage()}
          
    >
     <option value="en">🇬🇧 English</option>
    <option value="en-IN">🇮🇳 English (India)</option>
    <option value="hi">🇮🇳 Hindi</option>
    <option value="es">🇪🇸 Spanish</option>
    <option value="ru-RU">🇷🇺 Russian</option>
    <option value="zh">🇨🇳 Chinese</option>

    </select>
  );
};

export default LangSelector;