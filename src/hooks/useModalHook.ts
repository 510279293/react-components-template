import { ModalFormProps } from "@ant-design/pro-components"
import { useState } from "react"
import { Modal } from "antd"

type TableActionType = 'add' | 'update' | 'del' | any
// 新增/编辑 弹窗
interface MoalProps extends ModalFormProps{
    onSuccess?: () => void;
}

type useModalHookProps = {
    updateApi?: any;
    addApi?: any;
    delApi?: any;
    getInfoApi?: any;
    callBack?: () => void;
}
const useModalHook = ({ callBack, addApi, updateApi, delApi, getInfoApi }: useModalHookProps) => {
    const [modalProps, setModalProps] = useState<MoalProps>({
        visible: false, 
        title: '新增', 
        params: {}, 
        request: undefined,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        modalProps: { destroyOnClose: true, onCancel: () => closeModal() } as any,
        onFinish: undefined
    })

    // 关闭弹窗
    const closeModal = () => setModalProps({...modalProps, visible: false})

    // 成功回调
    const onSuccess = () => { closeModal(); callBack?.() }

    // 新增操作
    const addAction = (params?: any) => setModalProps({
        ...modalProps, 
        visible: true, 
        title: '新增', 
        request: undefined, 
        onFinish: addApi ? (values: any) => addApi?.({...values, ...params?.params}, true, onSuccess) : undefined,
        ...params
    })
    // 编辑操作
    const editAction = (params?: any) => setModalProps({
        ...modalProps, 
        visible: true, 
        title: '编辑', 
        request: getInfoApi ? getInfoApi : undefined,
        onFinish: updateApi ? (values: any) => updateApi?.({...values, ...params?.params}, true, onSuccess) : undefined,
        ...params
    })

    // 删除操作
    const delAction = (params: any) => Modal.confirm({
        title: '确认要删除该数据吗?',
        content: '删除后当前内容将永久删除，不可恢复。',
        okText: '确认',
        cancelText: '取消',
        onOk: async() => {
            await delApi?.(params, true, onSuccess)
        },
    });

    const createAction = (action: TableActionType, params?: any) => {
        switch (action) {
            case 'add':
                return addAction(params)
            case 'update':
                return editAction(params)
            case 'del':
                return delAction(params)
            default:
        }
    }

    return {
        modalProps,
        setModalProps,
        addAction,
        editAction,
        delAction,
        onSuccess,
        createAction
    }
}

export default useModalHook