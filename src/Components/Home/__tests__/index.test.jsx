import React from 'react';
import {
  render, screen, act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from '../';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key) => key }) }));

describe('Home', () => {
  it('should render home screen', async () => {
    const onChangePort = jest.fn();
    const onConnect = jest.fn();
    const onDisconnect = jest.fn();
    const onSetBaudRate = jest.fn();
    const onSetPort = jest.fn();
    const prompt = jest.fn();

    render(
      <Home
        onChangePort={onChangePort}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
        onSetBaudRate={onSetBaudRate}
        onSetPort={onSetPort}
      />
    );

    expect(screen.getByText('homeWelcome')).toBeInTheDocument();
    expect(screen.getByText('homeInstall')).toBeInTheDocument();
    expect(screen.getByText('addToHomeScreen')).toBeInTheDocument();
    expect(screen.getByText('betaWarningTitle')).toBeInTheDocument();
    expect(screen.getByText('betaWarningText')).toBeInTheDocument();
    expect(screen.getByText('homeDisclaimerHeader')).toBeInTheDocument();
    expect(screen.getByText('homeDisclaimerText')).toBeInTheDocument();
    expect(screen.getByText('homeAttributionHeader')).toBeInTheDocument();
    expect(screen.getByText('homeDisclaimerText')).toBeInTheDocument();
    expect(screen.getByText('homeAttributionHeader')).toBeInTheDocument();
    expect(screen.getByText('homeAttributionText')).toBeInTheDocument();
    expect(screen.getByText('homeExperimental')).toBeInTheDocument();
    expect(screen.getByText('homeVersionInfo')).toBeInTheDocument();
    expect(screen.getByText('blhelisText')).toBeInTheDocument();
    expect(screen.getByText('bluejayText')).toBeInTheDocument();
    expect(screen.getByText('openMelodyEditor')).toBeInTheDocument();
    expect(screen.getByText('blheli32ToAM32')).toBeInTheDocument();
    expect(screen.getByText('homeDiscordHeader')).toBeInTheDocument();
    expect(screen.getByText('homeDiscordText')).toBeInTheDocument();
    expect(screen.getByText('homeChinaHeader')).toBeInTheDocument();
    expect(screen.getByText('homeChinaText')).toBeInTheDocument();
    expect(screen.getByText('homeContributionHeader')).toBeInTheDocument();
    expect(screen.getByText('homeContributionText')).toBeInTheDocument();
    expect(screen.getByText('whatsNextHeader')).toBeInTheDocument();
    expect(screen.getByText('whatsNextText')).toBeInTheDocument();

    userEvent.click(screen.getByText(/addToHomeScreen/i));

    class BeforeInstallPromptEvent extends Event {
      prompt = () => prompt();
    }

    act(() => {
      const event = new BeforeInstallPromptEvent('beforeinstallprompt');
      window.dispatchEvent(event);
    });

    userEvent.click(screen.getByText(/addToHomeScreen/i));
    expect(prompt).toHaveBeenCalled();
  });
});
