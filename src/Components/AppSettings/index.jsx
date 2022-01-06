import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';

import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';

import Checkbox from '../Input/Checkbox';
import Overlay from '../Overlay';

import './style.scss';

function AppSettings({
  settings,
  onClose,
  onUpdate,
  open,
}) {
  const { t } = useTranslation('settings');

  function handleCheckboxChange(e) {
    const name = e.target.name;
    const value = e.target.checked;

    onUpdate(name, value);
  }

  const settingKeys = Object.keys(settings);
  const settingElements = settingKeys.map((key) => {
    const setting = settings[key];

    switch(setting.type) {
      case 'boolean': {
        return (
          <>
            <Checkbox
              hint={t(`${key}Hint`)}
              key={key}
              label={t(key)}
              name={key}
              onChange={handleCheckboxChange}
              value={setting.value ? 1 : 0}
            />

            <Divider />
          </>
        );
      }
    }
  });

  return (
    <div className="settings">
      <Overlay
        headline={t('settingsHeader')}
        maxWidth='sm'
        onClose={onClose}
        open={open}
      >
        <FormControl
          component="fieldset"
          variant="standard"
        >
          {settingElements}
        </FormControl>
      </Overlay>
    </div>
  );
}

AppSettings.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  settings: PropTypes.shape().isRequired,
};

export default AppSettings;
