package com.yss.newexport.Controller;

import com.yss.newexport.Entity.AccountVO;
import com.yss.newexport.Entity.CourseCodeReportVO;
import com.yss.newexport.Entity.CourseRelVO;
import com.yss.newexport.Entity.KmVO;
import com.yss.newexport.Service.Inter.IaccountRelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("kmMapping")
public class KmMappingController {
    @Autowired
    private IaccountRelService accountRelService;

    /**
     * 查询源科目信息
     */
    @RequestMapping("queryCourseCode")
    public List<CourseCodeReportVO> queryCourseCode() throws Exception {
        List<CourseCodeReportVO> list = accountRelService.queryCourseCode();
        for (CourseCodeReportVO cc : list) {
            cc.setSource(cc.getCoaId() + "--" + cc.getCoaName());
        }
        return list;
    }

    /**
     * 查询目标科目信息
     */
    @RequestMapping("queryKm")
    public List<KmVO> queryKm() throws Exception {
        List<KmVO> list = accountRelService.queryKm();
        if (null != list && list.size() > 0) {
            for (KmVO km : list) {
                km.setTarget(km.getKmCode() + "--" + km.getKmName());
            }
        }
        return list;
    }

    /**
     * 查询账户信息
     */
    @RequestMapping("queryAccount")
    public List<AccountVO> queryAccount() throws Exception {
        List<AccountVO> list = accountRelService.queryAccount();
        if (null != list && list.size() > 0) {
            for (AccountVO account : list) {
                account.setAccount(account.getAccountCode() + "--" + account.getAccountName());
            }
        }
        return list;
    }

    /**
     * 查询科目映射
     */
    @RequestMapping("queryKmMapping")
    public List<CourseRelVO> queryKmMapping(String flag) throws Exception {
        List<CourseRelVO> list = accountRelService.queryKmMapping(flag);
        return list;
    }


    /**
     * 保存科目映射
     *
     * @param courseRel
     */
    @RequestMapping("saveKmMapping")
    public void saveKmMapping(@RequestBody CourseRelVO courseRel) throws Exception {
        String[] source = courseRel.getSource().split("--");
        String[] sourceParent = courseRel.getSourceParent().split("--");
        String[] target = courseRel.getTarget().split("--");
        String[] targetParent = courseRel.getTargetParent().split("--");
        courseRel.setSrcCourseCode(source[0]);
        courseRel.setSrcCourseCodeName(source[1]);
        courseRel.setTargetCourseAccountCode(sourceParent[0]);
        courseRel.setTargetCourseAccountCodeName(sourceParent[1]);
        courseRel.setTargetCourseCode(target[0]);
        courseRel.setTargetCourseCodeName(target[1]);
        courseRel.setTargetParentCode(targetParent[0]);
        courseRel.setTargetParentCodeName(targetParent[1]);
        courseRel.setcAssetCode("Z00295");
        accountRelService.saveKmMapping(courseRel);
      //  System.out.println("=====================================" + courseRel.getId());
//        CourseRelVO cr = accountRelService.findCourseRelById(courseRel.getId());
//        return cr;
    }

    /**
     * 修改科目映射
     *
     * @param courseRel
     */
    @RequestMapping("updateKmMapping")
    public void updateKmMapping(@RequestBody CourseRelVO courseRel) throws Exception {
        String[] source = courseRel.getSource().split("--");
        String[] sourceParent = courseRel.getSourceParent().split("--");
        String[] target = courseRel.getTarget().split("--");
        String[] targetParent = courseRel.getTargetParent().split("--");
        courseRel.setSrcCourseCode(source[0]);
        courseRel.setSrcCourseCodeName(source[1]);
        courseRel.setTargetCourseAccountCode(sourceParent[0]);
        courseRel.setTargetCourseAccountCodeName(sourceParent[1]);
        courseRel.setTargetCourseCode(target[0]);
        courseRel.setTargetCourseCodeName(target[1]);
        courseRel.setTargetParentCode(targetParent[0]);
        courseRel.setTargetParentCodeName(targetParent[1]);
        accountRelService.updateKmMapping(courseRel);
    }

    /**
     * 删除科目映射
     *
     * @param ids
     */

    @RequestMapping("delKmMapping")
    public void delKmMapping(String ids) {
        try {
            String[] arr = ids.split(",");
            Integer array[] = new Integer[arr.length];
            for (int i = 0; i < arr.length; i++) {
                array[i] = Integer.parseInt(arr[i]);
            }
            List<Integer> idsList = Arrays.asList(array);
            accountRelService.delKmMapping(idsList);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
