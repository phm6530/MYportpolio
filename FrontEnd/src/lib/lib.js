import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
//lib 버전 통일위해서 lib.js 운용할란다..

export const ReactStyled = styled;
export const ReactHookForm = { useForm, FormProvider };
export const ReactQuery = { useMutation, useQueryClient, useQuery };
export const ReactRedux = { useDispatch, useSelector };
export const ReactRouteDom = { useSearchParams };
