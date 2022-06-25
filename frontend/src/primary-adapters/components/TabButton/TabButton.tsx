import styled from 'styled-components';
import { useRef, useState } from 'react';

const TIMOUT_FOR_SHOW_DELETE_BUTTON = 1500;

const TabButtonContainer = styled.div`
  position: relative;

  padding: 10px;

  width: fit-content;
  height: fit-content;

  cursor: auto;
  user-select: none;
  overflow: hidden;
`;

const DeleteTabButton = styled.div`
  position: absolute;
  top: 3px;
  left: 3px;
  z-index: 999;

  width: 17px;
  height: 17px;

  font-size: 0.8em;
  text-align: center;
  color: black;

  border-radius: 50%;

  background-color: #ffffff;

  cursor: pointer;
  user-select: none;

  overflow: hidden;

  &:hover {
    background-color: #000000;
    color: white;
  }
`;

const ActiveTabButton = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;

  width: fit-content;
  height: fit-content;

  border-style: solid;
  text-align: center;

  font-size: 16px;
  font-weight: bold;

  background-color: rgba(0, 82, 204, 200);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px;
  backdrop-filter: blur(15px);

  cursor: pointer;

  user-select: none;

  &:hover {
    background-color: #014ab8;
  }

  &:active {
    background-color: #0042a3;
  }
`;

const NotActiveTabButton = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;

  width: fit-content;
  height: fit-content;

  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px;

  color: white;
  text-transform: uppercase;

  font-size: 16px;
  font-weight: bold;

  cursor: pointer;
  user-select: none;

  overflow: hidden;
`;

export const CreateTabButton = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 19px;
  padding-right: 19px;

  width: fit-content;
  height: fit-content;

  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px;

  color: white;
  text-transform: uppercase;

  font-size: 16px;
  font-weight: bold;

  cursor: pointer;
  user-select: none;

  overflow: hidden;
`;

const EditTabButton = styled.input`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;

  width: fit-content;
  height: fit-content;

  color: white;
  font-size: 16px;
  font-weight: bold;

  border-style: solid;
  text-align: center;

  background-color: rgba(0, 82, 204, 200);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px;
  backdrop-filter: blur(15px);

  cursor: text;
`;

export interface TabButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
  onChangeGridName: (newName: string) => void;
  onDelete: () => void;
}

export const TabButton = ({ name, isActive, onClick, onChangeGridName, onDelete }: TabButtonProps): JSX.Element => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [deleteModeTimer, setDeleteModeTimer] = useState<NodeJS.Timeout>();
  const inputRef = useRef(null);

  const resetEditMode = (): void => {
    setIsEditMode(false);
    onChangeGridName(newName);
  };

  const resetDeleteButtonTimer = (): void => {
    clearTimeout(deleteModeTimer);
  };

  const onClickTabButton = (event: React.MouseEvent<HTMLElement>): void => {
    resetDeleteButtonTimer();
    if (event.detail >= 2) {
      setIsEditMode(true);
      setIsDeleteMode(true);
    }
    onClick();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewName(event.target.value);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      resetEditMode();
    }

    if (event.key === 'Esc') {
      resetEditMode();
    }
  };

  const onClickInput = (): void => {
    // @ts-ignore
    inputRef?.current?.select();
  };

  const onFocusOut = (): void => {
    setIsEditMode(false);
    setNewName(name);
  };

  const onMouseEnter = (): void => {
    setDeleteModeTimer(setTimeout(() => setIsDeleteMode(true), TIMOUT_FOR_SHOW_DELETE_BUTTON));
  };

  const onMouseLeaveTabButton = (): void => {
    resetDeleteButtonTimer();
  };

  const onMouseLeaveDeleteButton = (): void => {
    setIsDeleteMode(false);
    resetDeleteButtonTimer();
  };

  if (isEditMode) {
    return (
      <TabButtonContainer>
        <EditTabButton
          ref={inputRef}
          type="text"
          value={newName}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          onClick={onClickInput}
          onBlur={onFocusOut}
        />
      </TabButtonContainer>
    );
  }

  const onClickDelete = (): void => {
    resetDeleteButtonTimer();
    onDelete();
  };

  if (isActive) {
    return (
      <TabButtonContainer>
        {isDeleteMode ? (
          <DeleteTabButton onClick={onClickDelete} onMouseLeave={onMouseLeaveDeleteButton}>
            ×
          </DeleteTabButton>
        ) : null}
        <ActiveTabButton onClick={onClickTabButton} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeaveTabButton}>
          {name}
        </ActiveTabButton>
      </TabButtonContainer>
    );
  }

  return (
    <TabButtonContainer>
      {isDeleteMode ? (
        <DeleteTabButton onClick={onClickDelete} onMouseLeave={onMouseLeaveDeleteButton}>
          ×
        </DeleteTabButton>
      ) : null}
      <NotActiveTabButton onClick={onClickTabButton} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeaveTabButton}>
        {name}
      </NotActiveTabButton>
    </TabButtonContainer>
  );
};
