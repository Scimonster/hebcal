#                                               -*- Autoconf -*-
# Process this file with autoconf to produce a configure script.

AC_PREREQ(2.57)
AC_INIT(hebcal,3.15,hebcal-bugs@sadinoff.com)
AC_CONFIG_SRCDIR([common.c])
dnl #AM_INIT_AUTOMAKE([no-dependencies check-news])
AM_INIT_AUTOMAKE
AM_CONFIG_HEADER([config.h])

# Checks for programs.
AC_PROG_CC

# Checks for libraries.
dnl AC_CHECK_LIB(m, sin)
dnl AC_CHECK_LIB(m, cos)
dnl AC_CHECK_LIB(m, atan)
AC_CHECK_LIB(m, sqrt)
dnl AC_CHECK_LIB(m, acos)
dnl AC_CHECK_LIB(m, fabs)

# Checks for header files.
AC_HEADER_STDC
AC_CHECK_HEADERS([stdlib.h string.h sys/time.h])

# Checks for typedefs, structures, and compiler characteristics.
AC_C_CONST
AC_TYPE_SIZE_T

# Checks for library functions.
AC_FUNC_MALLOC
AC_CHECK_FUNCS([sqrt strchr strdup])
AC_ARG_WITH(default-city,
[[  --with-default-city=CITYNAME    make the default city CITYNAME.
                                  If unspecified, the default city will be "New York"]],
             AC_DEFINE_UNQUOTED(CITY,"$withval",["The Default City"]),
             AC_DEFINE(CITY,"New_York",["The default city"]))

AC_CONFIG_FILES([hebcal.1])
AC_CONFIG_FILES([Makefile])
AC_CONFIG_FILES([tests/Makefile])
AC_CONFIG_FILES([doc/Makefile])


AC_OUTPUT
