import type { JSX } from 'react';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { copyToClipBoard } from '@/utils/copy-to-clipboard';

type CopyButtonProps = {
  currentValue: string;
  delay: number;
};

export function CopyButton(props: CopyButtonProps): JSX.Element {
  const { currentValue, delay } = props;
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('RestClient');

  async function copyValue() {
    await copyToClipBoard(currentValue);
    handleToolTip();
  }

  function handleToolTip() {
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
    }, delay);
  }

  return (
    <Tooltip open={isOpen}>
      <TooltipTrigger asChild>
        <Button
          className="ml-auto"
          type="button"
          variant={'secondary'}
          onClick={copyValue}
        >
          {t('copy')}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>{t('copied')}</p>
      </TooltipContent>
    </Tooltip>
  );
}
