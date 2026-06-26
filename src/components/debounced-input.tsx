import * as React from 'react';
import { cn, debounce } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input, type InputProps } from '@/components/ui/input';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

interface DebouncedInputProps extends Omit<InputProps, 'onChange'> {
  containerClassName?: string;
  value: string;
  open: boolean;
  onChange: (value: string) => Promise<void>;
  onChangeStatusOpen: (value: boolean) => void;
  debounceTimeout?: number;
  maxLength?: number;
}

export function DebouncedInput({
  id = 'query',
  containerClassName,
  open,
  value,
  onChange,
  maxLength = 800,
  debounceTimeout = 300,
  onChangeStatusOpen,
  className,
  ...props
}: DebouncedInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // close search input on clicking outside,
  useOnClickOutside(inputRef, () => {
    if (!value) onChangeStatusOpen(true);
  });

  // configure keyboard shortcuts
  React.useEffect(() => {
    onChangeStatusOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      // close search input on pressing escape
      if (e.key === 'Escape') {
        void onChange('');
      }
      // open search input on pressing ctrl + k or cmd + k
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        if (!inputRef.current) return;
        e.preventDefault();
        onChangeStatusOpen(true);
        inputRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const debounceInput = React.useCallback(
    debounce((value) => {
      const strValue = value as string;
      void onChange(strValue);
    }, debounceTimeout),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounceInput(event.target.value);
  };

  return (
    <div className={cn('relative', containerClassName)}>
      <Input
        ref={inputRef}
        id={id}
        type="text"
        placeholder="Search..."
        className={cn(
          'h-11 rounded-full border-white/10 bg-black/40 py-2 pl-11 pr-4 text-base text-foreground shadow-inner shadow-black/30 transition-all duration-300 placeholder:text-muted-foreground focus-visible:border-primary/70 focus-visible:ring-primary/40',
          open
            ? 'w-[calc(100vw-2rem)] max-w-[28rem] border'
            : 'w-11 border-none bg-transparent px-0',
          className,
        )}
        defaultValue={value}
        maxLength={maxLength}
        onChange={handleChange}
        {...props}
      />
      <Button
        id="search-btn"
        aria-label="Search"
        variant="ghost"
        className={cn(
          'absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full p-0 text-foreground/80 hover:bg-white/10 hover:text-primary',
          open ? 'left-0.5' : 'left-0.5',
        )}
        onClick={() => {
          if (!inputRef.current) {
            return;
          }
          inputRef.current.focus();
          onChangeStatusOpen(!open);
        }}>
        <Icons.search
          className={cn(
            'transition-opacity hover:opacity-75 active:scale-95',
            open ? 'h-4 w-4' : 'h-5 w-5',
          )}
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}
