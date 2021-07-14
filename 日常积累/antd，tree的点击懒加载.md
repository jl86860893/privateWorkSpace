```js
// @ts-nocheck
import { useState, useEffect, Key, useRef } from 'react'
import { Modal, Card, message } from 'antd'
import TreeWithSearch from '@/components/TreeWithSearch'
import { addOrEditForm } from './config'
import { querySystemParamTree, addSystemParam, editSystemParam, deleteSystemParam } from '@/services/serverManageService'
import responseCode from '@/utils/responseCode'
import { changeValuesBeforeConfirm } from '@/utils/util'

import styles from './index.module.less'

const paramTagName = {
  '#': '叶参数',
  N: '非叶结点参数'
}

function SystemManage() {
  const [treeData, setTreeData] = useState();
  const [selectInfo, setSelectInfo] = useState({
    id: 0,
    paramRoot: '',
    paramFat: '',
    paramSub: '',
    paramName: '',
    paramTag: '',
    paramExt: '',
    paramRemark: '',
    paramPre: '',
  });
  const [currentForm, setCurrentForm] = useState([]);
  const [addOrEditTitle, setAddOrEditTitle] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const modalRef = useRef()

  useEffect(() => {
    setCurrentForm(addOrEditForm)
    thisQueryInitialTree()
  }, [])

  useEffect(() => {
    if (addOrEditTitle === '修改') {
      setCurrentForm(currentForm.map(item => {
        if (item.name === 'paramFat' || item.name === 'paramSub') {
          return {
            ...item,
            comProps: {
              allowClear: true,
              disabled: true
            }
          }
        }
        return item
      }))
    } else {
      setCurrentForm(addOrEditForm)
    }
  }, [addOrEditTitle])

  // 返回新的Node
  const updateTreeData = async(curTreeData: [{ key: React.Key, paramFat: string, paramRoot: string, paramSub: string, children: any }], key: React.Key) => {
    const result = await updateTreeDataIN(curTreeData, key)
    setTreeData(result)
  }

  const updateTreeDataIN = async (curTreeData: [{ key: React.Key, paramFat: string, paramRoot: string, paramSub: string, children: any }], key: React.Key) => {
    let data = []
    await Promise.all(
      curTreeData.map(node => {
        return new Promise(async (resolve, reject) => {
          if (node.key === key) {
            try {
              const res = await querySystemParamTree({
                id: 0,
                paramExt: null,
                paramFat: node.paramFat,
                paramName: null,
                paramPre: 0,
                paramRemark: null,
                paramRoot: node.paramRoot,
                paramSub: node.paramSub,
                paramTag: null,
                updateTime: null
              })
              if (res.data.code === responseCode.success) {
                const children = res.data.data ? res.data.data.map((item: any) => {
                  return {
                    key: item.id,
                    title: item.paramName,
                    ...item
                  }
                }) : [];
                resolve({
                  ...node,
                  children,
                });
              }
            } catch(e: any) {
              message.error(e)
            };
          }
          if (node.children) {
            
            const result = {
              ...node,
              children: await updateTreeDataIN(node.children, key),
            };
            resolve(result)
          }
          resolve(node);
        })
      })
    ).then((res) => {
      data = res;
    })
    return data
  }

  const thisQueryInitialTree = async () => {
    const res = await querySystemParamTree({
      id: 0,
      paramExt: null,
      paramFat: null,
      paramName: null,
      paramPre: 0,
      paramRemark: null,
      paramRoot: null,
      paramSub: null,
      paramTag: null,
      updateTime: null
    });
    if (res && res.data && res.data && (res.data.code === responseCode.success)) {
      // 数据需要做处理
      const subTree = res.data.data.map((item: any) => {
        return {
          ...item,
          key: item.id,
          title: item.paramName
        }
      })
      setTreeData(subTree)
    }
  }

  const handleSelect = (selectedKeys: Key[], e: any) => {
    // 选中项的数据
    console.log(e.selectedNodes[0])
    setSelectInfo(e.selectedNodes[0])
  }

const beforeAdd = (type: string) => {
    if ((!selectInfo || !selectInfo.paramRoot) && type === 'edit') {
      message.warn('请选中需要操作的节点')
      setIsModalVisible(false)
      return;
    }
    setAddOrEditTitle(type === 'add' ? '添加': '修改')
    if (type === 'add') {
      modalRef.current.setValue({
        paramRoot: (selectInfo && selectInfo.paramRoot) || '',
        paramFat: (selectInfo && selectInfo.paramSub) || '',
        paramSub: '',
        paramName: '',
        paramTag: '#',
        paramExt: '',
        paramRemark: '',
        paramPre: '',
      })
    } else {
      modalRef.current.setValue({
        id: selectInfo.id || null,
        paramRoot: selectInfo.paramRoot || null,
        paramFat: selectInfo.paramFat || null,
        paramSub: selectInfo.paramSub || null,
        paramName: selectInfo.paramName || null,
        paramTag: selectInfo.paramTag || null,
        paramExt: selectInfo.paramExt || null,
        paramRemark: selectInfo.paramRemark || null,
        paramPre: selectInfo.paramPre || null,
      })
    }
    setIsModalVisible(true)
  }

  const changeValueBeforeSubmit = (values) => {
    const returnValues = changeValuesBeforeConfirm(values);
    returnValues.paramPre = returnValues.paramPre && parseInt(returnValues.paramPre)
    returnValues.updateTime = null;
    return returnValues;
  }

  const searchParentId = () => {
    let id;
    let targetId = selectInfo.id
    const searchId = (data) => {
      if (data.hasOwnProperty('children')) {
        data.children.forEach(item => {
          if (item.id === targetId) {
            id = data.id
          } else {
              searchId(item, targetId)
          }
        })
      }
    }
    searchId({id: 0, children:treeData})
    return id || 0
  }

  const addOrEditSuccess = (form: any) => {
    modalRef.current.validateValues().then(async values => {
      const params = changeValueBeforeSubmit(values)
      debugger
      if (addOrEditTitle === '添加') {
        if (params.paramRoot === null) {
          params.paramRoot = params.paramSub;
          params.paramFat = params.paramSub;
          
          const res = await addSystemParam(params)
          if (res.data.code === responseCode.success) {
            // 重新更新节点
            const curParams = {
              ...params,
              key: res.data.data,
              title: params.paramName
            }
            const newTreeData = treeData.concat(curParams)
            setTreeData(newTreeData)
          }
        } else {
          const res = await addSystemParam(params)
          if (res.data.code === responseCode.success) {
            updateTreeData(treeData, selectInfo.id);
          }
        }
      } else {
        const res = await editSystemParam(params)
        if (res.data.code === responseCode.success) {
          if (selectInfo.paramRoot === selectInfo.paramSub) {
            // 重新更新节点
            const newTreeData = treeData.map(data => {
              if (data.paramFat === selectInfo.paramRoot) {
                return {
                  ...data,
                  ...res.data.data,
                  title: res.data.data.paramName
                }
              }
              return data
            })
            setTreeData(newTreeData)
          } else {
            const id = searchParentId()
            updateTreeData(treeData, id);
          }
          setSelectInfo(res.data.data)
          setIsModalVisible(false)
        }
      }
      setIsModalVisible(false)
    })
  }

  const deleteItem = async() => {
    const modal = Modal.confirm({
      width: 500,
        title: `确定是否删除该节点`,
        onOk: async() => {
          await confirmDelete();
          modal.destroy()
        },
        maskClosable: true,
    })
  }

const confirmDelete = async() => {
    debugger
    const params = changeValueBeforeSubmit(selectInfo)
    params.paramPre = params.paramPre && parseInt(params.paramPre)
    params.id = 0;
    params.updateTime = null;
    const res = await deleteSystemParam({
      ...params,
    })
    if (res.data.code === responseCode.success) {
      if (selectInfo.paramRoot === selectInfo.paramSub) {
        // 重新更新节点
        const newTreeData = treeData.filter(data => data.paramFat !== selectInfo.paramRoot)
        setTreeData(newTreeData)
      } else {
        const id = searchParentId()
        updateTreeData(treeData, id);
      }
    }

  }

  return (
    <div className={styles.holeWrapper}>
      <div className={styles.topTitle}>系统参数管理</div>
      <div className={styles.bankParamWrapper}>
        <TreeWithSearch
          modalRef={modalRef}
          addOrEditTitle={addOrEditTitle}
          beforeAdd={beforeAdd}
          deleteNode={deleteItem}
          addOrEditFormItems={currentForm}
          addOrEditSuccess={addOrEditSuccess}
          updateTreeData={updateTreeData}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          treeData={treeData}
          handleSelect={handleSelect}
        />
        <div className={styles.info}>
          <Card title="参数信息" style={{ height: '100%' }}>
            <div className={styles.infoInner}>
              <div>
                <div>根参数:</div>
                <div>父参数:</div>
                <div>参数号:</div>
                <div>参数名:</div>
                <div>参数标志:</div>
                <div>参数名扩展:</div>
                <div>参数说明:</div>
                <div>参数显示优先级别:</div>
              </div>
              <div className={styles.valuesItems}>
                <div>{selectInfo && selectInfo.paramRoot || '<空>'}</div>
                <div>{selectInfo && selectInfo.paramFat || '<空>'}</div>
                <div>{selectInfo && selectInfo.paramSub || '<空>'}</div>
                <div>{selectInfo && selectInfo.paramName || '<空>'}</div>
                <div>{selectInfo && paramTagName[selectInfo.paramTag] || '<空>'}</div>
                <div>{selectInfo && selectInfo.paramExt || '<空>'}</div>
                <div>{selectInfo && selectInfo.paramRemark || '<空>'}</div>
                <div>{selectInfo && selectInfo.paramPre || '<空>'}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SystemManage;
```