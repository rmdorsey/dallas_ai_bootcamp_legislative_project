// components/chat/Message.tsx
import React, { useState } from 'react';
import type { MessageProps } from '../../types';
import { BillsTable } from './BillsTable';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const Message: React.FC<MessageProps> = ({
  message,
  onAddressSubmit,
  onBillAction
}) => {
  const [address, setAddress] = useState('');

  const handleAddressSubmit = () => {
    if (address.trim() && onAddressSubmit) {
      onAddressSubmit(address.trim());
      setAddress('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddressSubmit();
    }
  };

  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
      {message.type === 'assistant' && (
        <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
          AI
        </div>
      )}

      <div className={`max-w-[${message.hasBillsTable ? '85%' : '70%'}] ${
        message.type === 'user' 
          ? 'bg-teal-700 text-white' 
          : 'bg-white border border-gray-200'
      } p-4 rounded-xl shadow-sm`}>
        <div className="text-sm leading-relaxed">
          {formatMessageContent(message.content)}
        </div>

        {/* Address Input */}
        {message.hasAddressInput && (
          <div className="flex gap-2 items-center mt-3">
            <Input
              type="text"
              placeholder="Enter your street address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              size="sm"
              onClick={handleAddressSubmit}
              disabled={!address.trim()}
            >
              Find Representative
            </Button>
          </div>
        )}

        {/* Bills Table */}
        {message.hasBillsTable && message.bills && onBillAction && (
          <div className="mt-3">
            <BillsTable bills={message.bills} onBillAction={onBillAction} />
          </div>
        )}
      </div>

      {message.type === 'user' && (
        <div className="w-9 h-9 bg-teal-700 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
          U
        </div>
      )}
    </div>
  );
};