import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react'

export default useUrlParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(() => keys.reduce((prev: K, key: K) => {
            return {...prev, [key]: searchParams.get(key) || ''}
        }, {} as { [key in K]: string }
        ), [searchParams]),
        setSearchParam
    ] as const
}
