import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';
import Variables from './variables/variables';
import { ScrollArea } from './ui/scroll-area';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ui/resizable';
import Image from 'next/image';
import imageSrc from '../../public/kitty.png';

export default function VariablesContent() {
  const t = useTranslations('Variables');

  return (
    <section>
      <div className="container mx-auto px-4 py-16 lg:px-20">
        <div className="space-y-12">
          <div className="space-y-2 text-center">
            <Heading size="h2">{t('title')}</Heading>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              {t('description')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ScrollArea className="h-[450px] rounded-lg border">
              <Variables />
            </ScrollArea>
            <ResizablePanelGroup
              direction="vertical"
              className="min-h-[450px] rounded-lg border"
            >
              <ResizablePanel defaultSize={20}>
                <div className="flex h-[400px] w-full items-end justify-center">
                  <Image
                    priority
                    className="h-[250px] w-[250px] md:h-[300px] md:w-[300px]"
                    src={imageSrc}
                    alt="REST CLient Interface"
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={80} className="text-center">
                <p className="text-muted-foreground p-4">{t('pullDown')}</p>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
