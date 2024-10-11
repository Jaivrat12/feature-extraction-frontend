import { Button, cn, Input } from '@nextui-org/react';
import type { FormHTMLAttributes } from 'react';

interface UploadFormProps extends FormHTMLAttributes<HTMLFormElement> {}

export default function UploadForm({ className, ...props }: UploadFormProps) {
    return (
        <form
            className={cn('flex gap-4 w-fit', className)}
            {...props}
        >
            <Input
                name="json_file"
                type="file"
                accept=".json"
                required
            />
            <Button
                type="submit"
                color="primary"
            >
                Upload
            </Button>
        </form>
    );
}
