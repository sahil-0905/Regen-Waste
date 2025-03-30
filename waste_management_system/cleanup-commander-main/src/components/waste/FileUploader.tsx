
import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import { Upload, X, File, Image, Check } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  maxSize?: number; // in MB
}

const FileUploader = ({
  onFilesSelected,
  maxFiles = 3,
  accept = "image/*",
  maxSize = 5, // 5MB
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const validateFiles = (fileList: FileList | File[]): File[] => {
    const validFiles: File[] = [];
    const fileArray = Array.from(fileList);
    
    // Check if adding these files would exceed maxFiles
    if (files.length + fileArray.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload up to ${maxFiles} files.`,
        variant: "destructive",
      });
      return validFiles;
    }
    
    for (const file of fileArray) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the maximum size of ${maxSize}MB.`,
          variant: "destructive",
        });
        continue;
      }
      
      // Check file type if accept is specified
      if (accept && accept !== "*" && !file.type.match(accept.replace(/\*/g, '.*'))) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an accepted file type.`,
          variant: "destructive",
        });
        continue;
      }
      
      validFiles.push(file);
    }
    
    return validFiles;
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length) {
      const validFiles = validateFiles(e.dataTransfer.files);
      if (validFiles.length) {
        const newFiles = [...files, ...validFiles];
        setFiles(newFiles);
        onFilesSelected(newFiles);
        
        toast({
          title: "Files uploaded",
          description: `Successfully added ${validFiles.length} file(s).`,
        });
      }
    }
  };
  
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const validFiles = validateFiles(e.target.files);
      if (validFiles.length) {
        const newFiles = [...files, ...validFiles];
        setFiles(newFiles);
        onFilesSelected(newFiles);
        
        toast({
          title: "Files uploaded",
          description: `Successfully added ${validFiles.length} file(s).`,
        });
      }
    }
  };
  
  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };
  
  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };
  
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-6 w-6 text-sky-primary" />;
    }
    return <File className="h-6 w-6 text-eco-primary" />;
  };
  
  return (
    <div className="space-y-4">
      <div
        className={`drop-area ${isDragging ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-eco-background rounded-full">
            <Upload className="h-6 w-6 text-eco-primary" />
          </div>
          <div className="text-center">
            <p className="font-medium text-sm">Drag and drop files here</p>
            <p className="text-xs text-muted-foreground mt-1">
              or <Button type="button" variant="link" className="p-0 h-auto text-xs" onClick={handleBrowseFiles}>browse files</Button>
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Max {maxFiles} files, up to {maxSize}MB each
          </p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileInputChange}
          accept={accept}
          multiple={maxFiles > 1}
        />
      </div>
      
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Uploaded Files ({files.length}/{maxFiles})</p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-50 p-2 rounded-md">
                <div className="flex items-center space-x-2">
                  {getFileIcon(file)}
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500"
                  onClick={() => handleRemoveFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-green-500"
              onClick={() => {
                toast({
                  title: "Upload complete",
                  description: `${files.length} file(s) ready for submission.`,
                  icon: <Check className="h-4 w-4 text-green-500" />
                });
              }}
            >
              <Check className="h-4 w-4 mr-1" />
              Confirm Files
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
