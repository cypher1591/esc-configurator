import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';

import GenericButton from './GenericButton';

import './style.scss';

function Buttonbar({
  onOpenMelodyEditor,
  onReadSetup,
  onWriteSetup,
  onSeletFirmwareForAll,
  onResetDefaults,
  onSaveLog,
  canRead,
  canWrite,
  canFlash,
  canResetDefaults,
  showMelodyEditor,
}) {
  const { t } = useTranslation('common');

  return (
    <div className="button-bar">
      <Box
        sx={{
          p: 1,
          width: 1,
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          spacing={1}
        >
          <div className="buttons-bottom mobile-show">
            {showMelodyEditor &&
              <GenericButton
                disabled={!canRead}
                onClick={onOpenMelodyEditor}
                text={t('escButtonOpenMelodyEditor')}
              />}
          </div>

          <Grid item>
            <div className="buttons-left">
              <ButtonGroup>
                <GenericButton
                  onClick={onSaveLog}
                  text={t('escButtonSaveLog')}
                />

                <GenericButton
                  className="mobile-show"
                  disabled={!canResetDefaults}
                  onClick={onResetDefaults}
                  text={t('resetDefaults')}
                />
              </ButtonGroup>
            </div>
          </Grid>

          <Grid item>
            <div className="buttons-right">
              <ButtonGroup>
                {showMelodyEditor &&
                  <GenericButton
                    disabled={!canRead}
                    onClick={onOpenMelodyEditor}
                    text={t('escButtonOpenMelodyEditor')}
                  />}

                <GenericButton
                  className="mobile-hide"
                  disabled={!canResetDefaults}
                  onClick={onResetDefaults}
                  text={t('resetDefaults')}
                />

                <GenericButton
                  disabled={!canFlash}
                  onClick={onSeletFirmwareForAll}
                  text={t('escButtonFlashAll')}
                />

                <GenericButton
                  disabled={!canWrite}
                  onClick={onWriteSetup}
                  text={t('escButtonWrite')}
                />

                <GenericButton
                  disabled={!canRead}
                  onClick={onReadSetup}
                  text={t('escButtonRead')}
                />
              </ButtonGroup>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

Buttonbar.propTypes = {
  canFlash: PropTypes.bool.isRequired,
  canRead: PropTypes.bool.isRequired,
  canResetDefaults: PropTypes.bool.isRequired,
  canWrite: PropTypes.bool.isRequired,
  onOpenMelodyEditor: PropTypes.func.isRequired,
  onReadSetup: PropTypes.func.isRequired,
  onResetDefaults: PropTypes.func.isRequired,
  onSaveLog: PropTypes.func.isRequired,
  onSeletFirmwareForAll: PropTypes.func.isRequired,
  onWriteSetup: PropTypes.func.isRequired,
  showMelodyEditor: PropTypes.bool.isRequired,
};

export default Buttonbar;
