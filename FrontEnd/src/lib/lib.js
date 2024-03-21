import styled from 'styled-components';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import {
    useMutation,
    useQueryClient,
    useQuery,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
    useSearchParams,
    useNavigate,
    useParams,
    useLocation,
} from 'react-router-dom';
//lib 버전 통일위해서 lib.js 운용할란다..

export const ReactStyled = styled;
export const ReactHookForm = { useForm, FormProvider, Controller };
export const ReactQuery = {
    useMutation,
    useQueryClient,
    useQuery,
    QueryClient,
    QueryClientProvider,
};
export const ReactRedux = { useDispatch, useSelector };
export const ReactRouteDom = {
    useSearchParams,
    useNavigate,
    useParams,
    useLocation,
};
