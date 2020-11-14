import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { dismissToast, toastSelector, toastType } from "@store/reducers/toastSlice";

const Wrapper = styled.div`
  position: absolute;
  top: 100px;
  right: 50px;
  z-index: 100;
  
  & > ol {
    & > li {
      &:not(:first-of-type) {
        margin-top: 10px;
      }
    }
  }
`

const Toast = styled.li`
  display: flex;
  
  padding: 8px 24px;
  max-width: 476px;
  background: #FFFFFF;
  box-shadow: 0 4px 24px rgba(29, 37, 60, 0.08);
  border-radius: 8px;
  
  h3 {
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    margin: 0;
    
    i {
      color: ${p => p.iconColor};
    }
    
    & > span {
      margin-left: 10px;
    }
  }
`

const ToastContent = styled.div`
  flex: 1;
  
  & > ol {
    margin-top: 4px;
    margin-left: 30px;
    
    & > li {
      font-size: 12px;
      line-height: 20px;
      color: rgba(29, 37, 60, 0.64);
      
      display: flex;
      i {
        margin-right: 8px;
      }
      &:not(:first-of-type) {
        margin-top: 2px;
      }
    }
  }
`

const ToastAction = styled.div`
  width: 72px;
  color: rgba(29, 37, 60, 0.64);
  
  span {
    float: right;
    font-size: 12px;
    line-height: 24px;
    cursor: pointer;
    user-select: none;
  }
`

function getIconColor(type) {
  switch (type) {
    case toastType.INFO:
      return '#04D2C5'
    case toastType.SUCCESS:
      return '#3ABC3F'
    case toastType.ERROR:
      return '#EC4730'
    default:
      return '#EC4730'
  }
}

function getIconName(type) {
  switch (type) {
    case toastType.INFO:
      return 'info circle'
    case toastType.SUCCESS:
      return 'check circle'
    case toastType.ERROR:
      return 'exclamation circle'
    default:
      return 'exclamation circle'
  }
}

export default function ToastContainer() {
  const toasts = useSelector(toastSelector)
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <ol>
        {
          toasts.map(({ id, type, title, items = [] }) => {
            return (
              <Toast key={id} iconColor={getIconColor(type)}>
                <ToastContent>
                  <h3>
                    <Icon name={getIconName(type)} />
                    <span>{title}</span>
                  </h3>
                  <ol>
                    {
                      items.map((item, idx) => {
                        return <li key={idx}>
                          <i>-</i>
                          <p>{item}</p>
                        </li>
                      })
                    }
                  </ol>
                </ToastContent>
                <ToastAction>
                  <span onClick={() => {
                    dispatch(dismissToast(id))
                  }}>Dismiss</span>
                </ToastAction>
              </Toast>
            )
          })
        }
      </ol>
    </Wrapper>
  )
}
