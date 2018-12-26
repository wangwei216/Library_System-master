/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : expressdb

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-12-26 15:58:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_book
-- ----------------------------
DROP TABLE IF EXISTS `t_book`;
CREATE TABLE `t_book` (
  `Book_num` int(11) NOT NULL,
  `Book_name` varchar(255) DEFAULT NULL,
  `imgPath` varchar(255) DEFAULT NULL,
  `Writer` varchar(255) DEFAULT NULL,
  `Sort_name` varchar(255) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `Pub_company` varchar(255) DEFAULT NULL,
  `Pub_date` datetime DEFAULT NULL,
  `Total_num` int(11) DEFAULT NULL,
  `Current_num` int(11) DEFAULT NULL,
  `Buy_date` datetime DEFAULT NULL,
  `Brief` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Book_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_book
-- ----------------------------
INSERT INTO `t_book` VALUES ('1', '并发编程实战', '../../../static/images/book/', '高洪岩', '6', '98', '东软集团', '2018-12-29 00:00:00', '50', '12', '2017-10-09 00:00:00', 'Java高并发编程详解：多线程与架构设计+Java并发编程：核心方法与框架');
INSERT INTO `t_book` VALUES ('2', '深入理解Java虚拟机', 'http://img13.360buyimg.com/n1/s200x200_jfs/t6130/167/771989293/235186/608d0264/592bf167Naf49f7f6.jpg', '周志明', '5', '89', '机械出版社', '2013-01-01 14:12:29', '100', '50', '2018-12-12 14:12:51', '深入理解Java虚拟机：JVM高级特性与最佳实践（第2版）');
INSERT INTO `t_book` VALUES ('3', 'Java多线程编程核心技术', 'http://img14.360buyimg.com/n1/s200x200_jfs/t1408/343/298344088/165083/8c0b31fa/55726488N4453a762.jpg', '高洪岩', '7', '69', '机械工业出版社', '2011-01-01 00:00:00', '80', '15', '2018-07-01 00:00:00', '　Java多线程无处不在，多线程可以有效提升计算和处理效率，大大提升吞吐量和可伸缩性，深得广大程序员和公司');
INSERT INTO `t_book` VALUES ('4', 'JavaScript和JQ程序设计', 'http://file.ryjiaoyu.com/SmallCover/1705499e849f3c8090c5', '陈鹏', '10', '59', '人民邮电出版社', '2015-01-25 16:05:45', '60', '10', '2018-12-16 16:05:58', 'JS和JQ程序设计（慕课版）');

-- ----------------------------
-- Table structure for t_book_student
-- ----------------------------
DROP TABLE IF EXISTS `t_book_student`;
CREATE TABLE `t_book_student` (
  `ID` int(11) NOT NULL,
  `Book_num` int(11) DEFAULT NULL,
  `Student_code` varchar(255) DEFAULT NULL,
  `borrow_date` datetime DEFAULT NULL,
  `return_date` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_book_student
-- ----------------------------
INSERT INTO `t_book_student` VALUES ('1', '1', '211', '2018-12-10 21:38:39', '2018-12-27 21:38:56');
INSERT INTO `t_book_student` VALUES ('2', '2', '211', '2018-10-01 14:31:12', '2019-01-04 14:31:18');
INSERT INTO `t_book_student` VALUES ('3', '3', '208', '2018-10-10 19:16:02', '2018-12-31 21:38:39');

-- ----------------------------
-- Table structure for t_student
-- ----------------------------
DROP TABLE IF EXISTS `t_student`;
CREATE TABLE `t_student` (
  `Student_num` int(11) NOT NULL,
  `Student_code` int(255) DEFAULT NULL COMMENT '学生学号',
  `Student_name` varchar(255) DEFAULT NULL,
  `Academy_name` varchar(255) DEFAULT NULL COMMENT '专业',
  `Class_name` varchar(255) DEFAULT NULL,
  `Sex` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Student_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_student
-- ----------------------------
INSERT INTO `t_student` VALUES ('66', '211', '王伟wei', '软件工程', '16002班', '男', '528175453@qq.com');
INSERT INTO `t_student` VALUES ('77', '208', '葛豪hao', '计算机科学', '15004', '男', '110@qq.com');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('wangwei', '123');
INSERT INTO `user` VALUES ('admin', '123');
INSERT INTO `user` VALUES ('chenpeng', '123456');
