import {useLocation} from "react-router-dom";

/**
 * 获取页面url的query参数 let query = useQuery();  query.get('aaa')
 * @returns 
 */
export default function useQuery() {
  return new URLSearchParams(useLocation().search);
}
