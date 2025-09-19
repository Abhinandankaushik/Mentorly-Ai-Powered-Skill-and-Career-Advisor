import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, X } from 'lucide-react';
import useResponseStore from '../store/responsestore'
const AIInputComponent = () => {
    const [inputText, setInputText] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [dragOver, setDragOver] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const {getResponse } = useResponseStore();

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
        }
    }, [inputText]);

    const handleSend = () => {
        if (inputText.trim() || attachedFiles.length > 0) {
            console.log('Sending:', { text: inputText, files: attachedFiles });
            getResponse(`${inputText}`);
            setInputText('');
            setAttachedFiles([]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = (e, type = 'file') => {
        const files = Array.from(e.target.files);
        const newFiles = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            preview: type === 'image' ? URL.createObjectURL(file) : null
        }));
        setAttachedFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (id) => {
        setAttachedFiles(prev => {
            const fileToRemove = prev.find(f => f.id === id);
            if (fileToRemove && fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            return prev.filter(f => f.id !== id);
        });
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        const newFiles = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
        }));
        setAttachedFiles(prev => [...prev, ...newFiles]);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="bg-white border-2 border-orange-400 rounded-2xl  overflow-hidden transition-all duration-200 hover:shadow-3xl hover:border-gray-600">
                {/* Attached Files Display */}
                {attachedFiles.length > 0 && (
                    <div className="border-b border-gray-700 p-4">
                        <div className="flex flex-wrap gap-3">
                            {attachedFiles.map(file => (
                                <div key={file.id} className="relative group">
                                    {file.preview ? (
                                        <div className="relative">
                                            <img
                                                src={file.preview}
                                                alt={file.name}
                                                className="w-20 h-20 object-cover rounded-lg border-2 border-gray-600 hover:border-gray-500 transition-colors"
                                            />
                                            <button
                                                onClick={() => removeFile(file.id)}
                                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 bg-gray-750 border border-gray-600 rounded-lg p-3 pr-8 relative group hover:bg-gray-700 transition-colors">
                                            <Paperclip size={16} className="text-white" />
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-200 truncate max-w-32">
                                                    {file.name}
                                                </div>
                                                <div className="text-gray-500 text-xs">
                                                    {formatFileSize(file.size)}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFile(file.id)}
                                                className="absolute right-1 top-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Input Area */}
                <div
                    className={`relative transition-colors ${dragOver ? 'bg-blue-900/20 border-blue-400' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {dragOver && (
                        <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl border-2 border-dashed border-blue-400">
                            <div className="text-blue-300 font-medium text-lg">Drop files here</div>
                        </div>
                    )}

                    <div className="flex items-end gap-3 p-4">
                        {/* Action Buttons - Left */}
                        <div className="flex gap-2 pb-2">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-full transition-all"
                                title="Attach file"
                            >
                                <Paperclip size={20} />
                            </button>
                            <button
                                onClick={() => imageInputRef.current?.click()}
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-full transition-all"
                                title="Add image"
                            >
                                <Image size={20} />
                            </button>
                        </div>

                        {/* Text Input */}
                        <div className="flex-1 min-w-0">
                            <textarea
                                ref={textareaRef}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message... (Shift+Enter for new line)"
                                className="w-full resize-none border- pb-1.5 outline-none text-black placeholder-gray-500 bg-transparent text-base leading-6 min-h-[24px] max-h-[200px] overflow-y-auto"
                                rows="1"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#4B5563 #374151'
                                }}
                            />
                        </div>

                        {/* Send Button */}
                        <button
                            onClick={handleSend}
                            disabled={!inputText.trim() && attachedFiles.length === 0}
                            className={`p-2 mb-1.5 rounded-full transition-all ${inputText.trim() || attachedFiles.length > 0
                                ? 'bg-orange-400 hover:bg-orange-500 text-white shadow-lg hover:shadow-blue-500/25 cursor-pointer'
                                : 'bg-black text-white cursor-not-allowed'
                                }`}
                            title="Send message"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>

                {/* Hidden File Inputs */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, 'file')}
                    accept="*/*"
                />
                <input
                    ref={imageInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, 'image')}
                    accept="image/*"
                />
            </div>
        </div>
    );
};

export default AIInputComponent;
