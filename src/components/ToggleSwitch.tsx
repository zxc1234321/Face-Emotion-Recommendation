import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleSwitchWrapper = styled.label`
  display: inline-block;
  position: relative;
  width: 3em;
  height: 1.5em;
`;

const ToggleSwitchInput = styled.input`
  display: none;
`;

const ToggleSwitchButton = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightgray;
  border-radius: 1.5em;
  transition: background-color 0.4s ease;
  
  &:after {
    content: "🌝";
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 50%;
    background-color: white;
    border-radius: 50%;
    transition: all 0.4s ease;
  }
  
  ${ToggleSwitchInput}:checked + & {
    background-color: gray;
    
    &:after {
      content: "🌞";
      left: 50%;
    }
  }
`;

const ToggleSwitch = ({ isChecked, onChange }) => {
  return (
    <ToggleSwitchWrapper>
      <ToggleSwitchInput
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <ToggleSwitchButton />
    </ToggleSwitchWrapper>
  );
};

export default ToggleSwitch;
