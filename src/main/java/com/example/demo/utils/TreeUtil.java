package com.example.demo.utils;

import com.example.demo.entity.LcwMenu;

import java.util.ArrayList;
import java.util.List;

public class TreeUtil {

    /**
     * 使用递归方法建树
     *
     * @param treeNodes
     * @return
     */
    public static List<LcwMenu> rebuildList2Tree(List<LcwMenu> treeNodes) {
        boolean existRootNode = false;
        List<LcwMenu> newTree = new ArrayList<LcwMenu>();//初始化一个新的列表
        for (LcwMenu treeNode : treeNodes) {
            if (isRootNode(treeNode, treeNodes)) {//选择根节点数据开始找儿子
                newTree.add(findChildren(treeNode, treeNodes));
                existRootNode = true;
            }
        }
        if(!existRootNode){//也可能大家都是根节点
            return treeNodes;
        }
        return newTree;
    }

    /**
     * 判断节点是否是根节点
     * @param checkNode
     * @param treeNodes
     * @return
     */
    private static boolean isRootNode(LcwMenu checkNode, List<LcwMenu> treeNodes) {
        for (LcwMenu treeNode : treeNodes) {
            if (checkNode.getParent_id().equals(treeNode.getId())) {//判断checkNode是不是有爸爸
                return  false;
            }
        }
        return true;
    }


    /**
     * 递归查找子节点
     *
     * @param treeNodes
     * @return
     */
    private static LcwMenu findChildren(LcwMenu parentNode, List<LcwMenu> treeNodes) {
        List<LcwMenu> children = parentNode.getChildren();
        for (LcwMenu it : treeNodes) {
            if (parentNode.getId().equals(it.getParent_id())) {//找儿子，判断parentNode是不是有儿子
                children.add(findChildren(it, treeNodes));
            }
        }
        return parentNode;
    }

}
