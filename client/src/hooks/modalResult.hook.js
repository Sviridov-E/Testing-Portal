import React, { useState, useRef, useCallback, useEffect } from "react"
import { useHttp } from "./http.hook";

export const useModalResult = (token, userId) => {
  const [content, setContent] = useState(null);
  const [instance, setInstance] = useState(null);
  const [testId, setTestId] = useState(null);

  const { request, loading } = useHttp();

  const modal = useRef();

  const fetched = useCallback(async () => {
    if(!testId) return;
    
    const result = await request(`/api/result/test/${testId}${userId ? '/'+userId : ''}`, 'GET', null, {
      Authorization: `Bearer ${token}`
    });
    // data take value {}

    setContent(result);

  }, [testId, request, token, setContent]);

  const initialize = useCallback(() => {
    const instance = window.M.Modal.init(modal.current);    
    setInstance(instance);
  }, [modal]);

  const openWindow = useCallback(() => {
    if(!instance) return;
    instance.open();
    fetched();
  }, [instance, fetched]);

  const closeWindow = () => {
    if(!instance) return;
    setContent(null);
    setTestId(null);
    instance.close();
  }
  
  /*const content = {
    name: fetched.name,
    description: fetched.description,
    result: fetched.result
  }*/

  useEffect(()=>{
    fetched();
  }, [testId, fetched])

  return { initialize, openWindow, closeWindow, content, ref: modal, setTestId, loading }
}

