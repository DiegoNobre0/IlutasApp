import { Accordion, Text } from 'native-base';
import React from 'react';
import { Icon } from 'react-native-paper';

export function Accordeon(
  {
    data
  }: {
    data: Array<{
      summary: string | React.ReactNode;
      content: string | React.ReactNode
    }>
  }
){
  return (
    <Accordion
      style={{
        borderWidth: 0,
      }}
    >
      {
        data.map((item, index) => (
          <Accordion.Item key={index}
            style={{
              borderWidth: 0,
            }}

          >
            <Accordion.Summary
              _expanded={{
                backgroundColor: "transparent", 
              }} 
              className='w-full flex justify-between items-center'
            
            >
              <Text
                color={'#000'}
              >
                {item.summary}
              </Text> 
              
            <Accordion.Icon
              as={Icon}
              name='chevron-down'
              size={3}
              color='#083061'
              />
            </Accordion.Summary>
            <Accordion.Details>
              {item.content}
            </Accordion.Details>
          </Accordion.Item>
        ))
      }
    </Accordion>
  );

}